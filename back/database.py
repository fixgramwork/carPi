#기존에 존재하는 DB를 sqlalchemy를 이용해 연결해주는 파일
from sqlalchemy import *
from sqlalchemy.orm import sessionmaker

DB_URL = 'mysql+pymysql://root:password@localhost:3306/User'

class engineconn:
  def __init__(self):
    self.engine = create_engine(DB_URL, pool_recycle = 500)
  def sessionmaker(self):
    Session = sessionmaker(bind=self.engine)
    session = Session()
    return session
  def connection(self):
    conn = self.engine.connect()
    return conn