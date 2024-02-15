from django import forms
from django.contrib.auth.models import User, Group
from django.core.exceptions import ValidationError
from project_code.conf_infa import main_email, main_password, generate_admin_code
import uuid


class NewUserForm(forms.ModelForm):
    password1 = forms.CharField(label='Пароль')
    password2 = forms.CharField(label='Подтвердите пароль')
    code_admin_input = forms.CharField(required=False)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')

    with open('code_admin.txt', encoding='UTF8') as code_row:
        code_admin = code_row.readline().strip()

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email=email).exists():
            raise ValidationError("Эта почта уже занята.")
        return email

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get('password1')
        password2 = cleaned_data.get('password2')
        code_admin_inp = self.cleaned_data.get('code_admin_input')

        if password1 and password2 and password1 != password2:
            raise ValidationError("Пароли не совпадают.")
        
        if len(code_admin_inp) > 0 and code_admin_inp != self.code_admin:
            print(self.code_admin)
            raise ValidationError("Неверный код админа")

        return cleaned_data
        
    def save(self, commit=True):
        user = super().save(commit=False)
        user.username = str(uuid.uuid4())
        user.set_password(self.cleaned_data["password1"])
        userAdmin = self.cleaned_data.get('code_admin_input') == self.code_admin
        userDirector = self.cleaned_data.get('email') == main_email and self.cleaned_data.get('password1') == main_password

        if userAdmin or userDirector:
            user.is_staff = True

        if commit:
            user.save()

        if userDirector:
            main_group, created = Group.objects.get_or_create(name='Directors')
            user.groups.add(main_group)
        elif userAdmin:
            admin_group, created = Group.objects.get_or_create(name='Admins')
            user.groups.add(admin_group)
            generate_admin_code()
        else:
            visitor_group, created = Group.objects.get_or_create(name='Visitors')
            user.groups.add(visitor_group)

        return user
