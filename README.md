# AutumnShop
Link download nodejs: https://nodejs.org/en/download/
Version nodejs: v14.17.0

Tạo database có tên là "autumn_shop" hoặc tên bất kỳ
Nếu đặt tên bất kỳ chúng ta cần đổi tên database trong folder api/models/database.js
Sau đó import file autumn_shop.sql vào database đã tạo trên phpMyadmin của Xamp, Wamp,..

Sau khi clone từ git về cần chạy lệnh cập nhật: npm i
Nếu clone lần đầu thì khi cập nhật có thể sẽ hơi lâu.

Sau khi cập nhật và cài các gói thư viện thì chúng ta có thể bắt đầu start server:
    1. cd api
    2. npm start
    3. url server: http://127.0.0.1:5000

Chạy giao diện khách hàng: bằng các lệnh trong terminal
    1. cd client
    2. npm start
    3. url client: http://127.0.0.1:3000

Chạy giao diện của quản trị viên: bằng các lệnh trong terminal
    1. cd admin
    2. npm start
    3. url admin: http://127.0.0.1:3001