Для использования приложения вам потребуется веб-сервер. Подойдет любой, даже самый простой. Под windows проще всего установить [mongoose](https://github.com/cesanta/mongoose), скопировать exe-файл в папку с сайтом, запустить, после чего сайт станет доступен по адресу http://localhost:8080 
##Установить node.js
Подробную инструкцию по установке для разных платформ можно найти [здесь](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager#debian-and-ubuntu-based-linux-distributions "")
Процитирую для самых распространённых
####Ubuntu, Linux Mint
```
curl --silent --location https://deb.nodesource.com/setup_0.12 | sudo bash -
```
```
sudo apt-get install --yes nodejs
```
##Установить node http-server
```
npm install http-server -g
```