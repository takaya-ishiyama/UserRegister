from django.test import TestCase, Client
# from django.contrib.auth import get_user_model
from accounts.models import User
# from accounts.views import UserListView

# Create your tests here.
class UserViewTests(TestCase):
    def set_up(self):
        self.client = Client()
        users=User.objects.all()
        self.assertEqual(len(users),0)

    def test_user_manager(self):
        User.objects.create(
            username="takaya",
            password="taka1480"
        )
        users=User.objects.all()
        
    # def test_my_view(self):
    #     response = self.client.post(
    #         path='/',
    #         data={'test_value': 'A'},
    #     )

    # def test_user_post(self):
        
        