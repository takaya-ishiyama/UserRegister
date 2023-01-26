from django.test import TestCase
from django.contrib.auth import get_user_model
from accounts.models import User

# Create your tests here.
class UserManagerTests(TestCase):
    def empty_user(self):
        users=User.objects.all()
        self.assertEqual(len(users),0)
        
    def test_user_manager(self):
        User.objects.create(
            username="aaa",
            password="aaa"
        )
        users=User.objects.all()
        self.assertEqual(len(users),1)