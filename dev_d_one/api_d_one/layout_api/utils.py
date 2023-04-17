# from contextlib import redirect_stderr
# from pprint import pprint
# from telnetlib import STATUS
from rest_framework.views import exception_handler
from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import get_object_or_404, render, redirect

def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)
    print('###### you are in the custom exception handler')
    print('!!! Alert:', response.data)
    
    if AuthenticationFailed:
        print('You are being redirected to the Login page')

    # Now add the HTTP status code to the response.
    if response is not None:
        response.data['status_code'] = response.status_code

    return response
    