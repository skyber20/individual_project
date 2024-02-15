def add_username_to_context(request):
    return {'first_name': request.user.first_name if request.user.is_authenticated else None}
