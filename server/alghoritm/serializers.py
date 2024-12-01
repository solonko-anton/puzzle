from rest_framework import serializers
from .algorithm import find_max_chain

class FileSerializer(serializers.Serializer):
    file = serializers.FileField()
    result = serializers.IntegerField(required=False)

    class Meta:
        fields = ['file', 'result']

    def validate(self, attrs):
        uploaded_file = attrs.get('file')
        content = uploaded_file.read().decode('utf-8') 
        lines = content.splitlines()

        numbers = [line.strip() for line in lines]

        res = find_max_chain(numbers)

        attrs['result'] = res
        print(res)
        return attrs
