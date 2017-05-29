import SimpleHTTPServer
import SocketServer
import urllib

class MyHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
  def do_GET(self):
    if self.path.find('redirect.html') == -1:
      # Call parent class to handle non-redirect requests. Note that we can't
      # use super(MyHandler, self).do_GET() because SimpleHTTPRequestHandler is
      # an old-style class; super() only works with new-style classes.
      print 'Super handles %s' % self.path
      SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)
    else:
      print self.path
      self.send_response(301)
      new_path = urllib.unquote(self.path[self.path.find('?') + 1:])
      self.send_header('Location', new_path)
      self.end_headers()

PORT = 8000
handler = SocketServer.TCPServer(("", PORT), MyHandler)
print "serving at port 8000"
handler.serve_forever()
