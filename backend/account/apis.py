from .models import User                          # モデル呼出
from rest_framework.generics import ListCreateAPIView    # API
from .serializers import UserSerializer                # APIで渡すデータをJSON,XML変換

class AccountApi(ListCreateAPIView):
    # 対象とするモデルのオブジェクトを定義
    queryset = User.objects.all()

    # APIがデータを返すためのデータ変換ロジックを定義
    serializer_class = UserSerializer

    # 認証
    permission_classes = []