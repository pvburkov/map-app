# map-app
SPA-приложение для построения упрощенного маршрута по точкам (с использованием API Яндекс.Карт).<br>
В приложении присутствует поле для ввода названия точки, список введенных точек и карта, на которой отображены эти точки.<br>
Ввод точки осуществляется по нажатии клавиши ```Enter```. Точки в списке можно менять местами перетаскиванием.<br>
Из списка их можно удалять, кнопка удаления есть у каждой точки в списке. На карте точки также можно перемещать.<br>
При вводе новой точки она автоматически появится в текущем центре карты.

Проект сделан с помощью приложения [Create React App](https://github.com/facebook/create-react-app).

## Инструкция для запуска

1. Убедитесь, что у вас на локальной машине установлен <strong>git, node.js и npm</strong><br>
2. Склонируйте этот репозиторий: ```git clone git@github.com:pvburkov/map-app.git```
3. Перейдите в папку приложения: ```cd map-app```
4. Установите все нужные для работы приложения пакеты: ```npm install```
5. Запускайте приложение: ```npm start```, если вы работаете под Unix-based ОС,<br>
    или ```npm run start:win```, если вы работаете под Windows

### Если вместо приложения вы видите сообщение "This site can’t be reached", то вместо ```localhost:3000``` в адресной строке браузера попробуйте набрать ```127.0.0.1:3000```. Подобная проблема встречается в Google Chrome.

## Подробнее о скриптах

В директории проекта доступны несколько скриптов:

### `npm start / npm run start:win`

Скрипт запускает приложение в режиме разработки<br>
(в начале проходят проверки кода с использованием ESLint и запуск юнит-тестов на Jest).<br>
Откройте [http://localhost:3000](http://localhost:3000), чтобы увидеть результат в браузере.

Страница будет перезагружена при внесении каких-либо изменений в код.

### `npm test / npm run test:nowatch / npm run test:nowatch:win`

Запуск юнит-тестов в интерактивном watch-режиме или без такого режима.

### `npm run build`

Генерация оптимизированных исходников и сборка рабочего варианта (билда) приложения в директории `build`.<br>
Подробнее о процессе выгрузки рабочего билда на сервер можно прочитать по ссылке: [deployment](https://facebook.github.io/create-react-app/docs/deployment).
