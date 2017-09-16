import threading
import webbrowser
import logging
import re
import urlparse
import BaseHTTPServer
import SimpleHTTPServer
from analytics.dags.dag_service import DagService

dagService = DagService()
PORT = 8089


class DagHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def do_POST(self):
        length = int(self.headers.getheader('content-length'))
        data_string = self.rfile.read(length)
        try:
            result = int(data_string) ** 2
        except:
            result = 'error'
        self.wfile.write(result)

    def do_GET(self):
        print   ('Get request received')
        self.send_response(200)
        self.send_header('Content-type','text/html')
        self.end_headers()
        param_dict = urlparse.parse_qs(urlparse.urlparse(self.path).query)

        if(re.match('/run?(.)*' ,self.path)):
            logging.info("In run dags" + str(param_dict))
            success = dagService.putNewRun(param_dict['roots'][0], param_dict['author'][0], param_dict['dag_id'][0])
            if (success):
                self.wfile.write("done")
                return
            else:
                self.wfile.write("Two dags run already running")
                return
        print self.path
        # Send the html message
        self.wfile.write("Hello World !")
        return

def start_server():
    print """Start the server."""
    server_address = ("", PORT)
    server = BaseHTTPServer.HTTPServer(server_address, DagHandler)
    server.serve_forever()

if __name__ == "__main__":
    start_server()
