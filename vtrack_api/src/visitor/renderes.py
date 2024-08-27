import csv
import io

from rest_framework import renderers



class CSVRenderer(renderers.JSONRenderer):
    """CSV Renderer"""

    charset = "utf-8"
    media_type = "text/csv"
    format = "csv"

    def render(self, data, accepted_media_type=None, renderer_context=None):
        if not isinstance(data, list):
            if data is None:
                return b""
            if isinstance(data, dict):
                return data

        if len(data) == 0:
            return b""
        with io.StringIO() as buffer:
            writer = csv.DictWriter(buffer, data[0].keys())
            writer.writeheader()
            writer.writerows(data)
            ret = buffer.getvalue()
        return ret
