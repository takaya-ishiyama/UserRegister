from django.db import models
import uuid
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    def _create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('名前を入力してください')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, **extra_fields)

    def create_superuser(self, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError('is_staff=Trueである必要があります。')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('is_superuser=Trueである必要があります。')
        return self._create_user(username, password, **extra_fields)

SEX_CHOICES = (
    (0, '男性'),
    (1, '女性'),
)

class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True, editable=False)
    username=models.CharField(verbose_name='username', max_length=30, unique=True)
    password=models.CharField(verbose_name='password', max_length=20)
    email = models.EmailField(verbose_name='email', null=True, blank=True)
    icon = models.ImageField(verbose_name='プロフィール画像', upload_to="icon/", blank=True, null=True)
    birth=models.DateField(verbose_name='誕生日', null=True, blank=True)
    sex=models.IntegerField(verbose_name='性別', choices=SEX_CHOICES, null=True, blank=True)
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)
    is_staff = models.BooleanField(_("staff status"), default=False)
    is_active = models.BooleanField(_("active"), default=True)
    first_name = models.CharField(max_length=30, null=True, blank=True)
    last_name = models.CharField(max_length=30, null=True, blank=True)

    objects = UserManager()
    USERNAME_FIELD="username"
    # EMAIL_FIELD='email'

    def __str__(self):
        return self.username

    def clean(self):
        super().clean()