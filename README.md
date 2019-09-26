### 留言板项目开发

##### 功能需求

- 匿名用户只能查看所有已审核的留言
- 普通用户登录后可以查看已审核的留言和评论, 发布新留言或评论
- 普通用户登录后可以修改自己的密码
- 管理员用户名为root, 初始密码为123456
- 管理员和普通用户使用相同的登录入口
- 管理员登录后可以对所有留言进行各种管理操作, 比如增加新留言或评论、删除留言、 查看留言的详细信息等
- 管理员登录后可以对所有普通用户进行各种管理操作， 比如创建新用户、删除用户、修改用户信息、查看用户详细信息等



##### 系统设计

功能模块:

- 留言管理
- 用户管理

**数据库设计**:

设计注意事项:1.增加mb_前缀以免不必要的冲突; 2.字段宜少不宜多

 

用户信息(mb_user): 用户ID(uid, 主键, 大于1000), 用户名(uname, 不能重复), 密码(upass), 手机号(phone), 邮箱(email), 注册时间(reg_time), 用户状态(state, 0表示已删除, 1表示正常, 2表示冻结, 3表示异常), 最近登录时间(last_login_time), 权限(priv, 1表示为普通用户, 2表示为后台管理员)

 

留言信息(mb_message): 留言ID(mid, 大于1000), 用户ID(uid, 未登录用户为0, 其他用户的ID大于1000), 留言内容(content), 留言时间(time), 评论留言ID(cid), 来源IP(from_ip), 留言状态(state, 0表示已删除, 1表示未审核, 2表示已审核)



##### 详细设计

- 短信验证码接口功能实现:

```def send_sms_code(phone):
  函数功能：发送短信验证码（6位随机数字）

    函数参数：

    phone 接收短信验证码的手机号

    返回值：发送成功返回验证码，失败返回False

    '''

    verify_code = str(random.randint(100000, 999999))

 

    try:

        url = "http://v.juhe.cn/sms/send"

        params = {

            "mobile": phone,  # 接受短信的用户手机号码

            "tpl_id": "162901",  # 您申请的短信模板ID，根据实际情况修改

            "tpl_value": "#code#=%s" % verify_code,  # 您设置的模板变量，根据实际情况修改

            "key": "ab75e2e54bf3044898459cb209b195e4",  # 应用APPKEY(应用详细页查询)

        }

        params = urllib.parse.urlencode(params).encode()

 

        f = urllib.request.urlopen(url, params)

        content = f.read()

        res = json.loads(content)

 

        if res and res['error_code'] == 0:

            return verify_code

        else:

            return False

    except:

        return False 

```

