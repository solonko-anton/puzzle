from .serializers import FileSerializer
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

class FileView(APIView):
    serializer_class = FileSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.FILES)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'Please upload a valid file'}, status=status.HTTP_400_BAD_REQUEST)






