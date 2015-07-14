Для начала нужно скачать архив notes.zip и распаковать в любое удобное место на вашем компьютере. Для использования приложения вам потребуется веб-сервер. Подойдет любой, даже самый простой. 

#Настройка сервера

##Способ №1 (only windows)
Под windows проще всего установить [mongoose](https://github.com/cesanta/mongoose), скопировать exe-файл в папку с сайтом, запустить, после чего сайт станет доступен в любом браузере по адресу [http://localhost:8080](http://localhost:8080)
##Способ №2 (нормальные ОС)
###Установить node.js
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
Теперь переходим в папку с сайтом
```
cd /путь/до/папки/notes/
```
И запускаем наш веб-сервер
```
http-server
```
После чего наш сайт будет доступен по адресу [http://localhost:8080](http://localhost:8080)

#Browser support
Chrome, Opera, Safari, IE9+