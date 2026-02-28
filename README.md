# Todo List App

Минимальное приложение Todo List, реализованное с использованием React/TypeScript.

## GitHub Pages

https://dotdaniil.github.io/todo-list/

## Стек технологий

- **React 18** – библиотека для построения пользовательских интерфейсов
- **TypeScript** – строгая типизация для JavaScript
- **Vite** – быстрый билдер и dev-сервер
- **Redux Toolkit** – управление состоянием приложения
- **@dnd-kit** – drag-and-drop для сортировки Todo элементов
- **styled-components** – стилизация компонентов через CSS-in-JS
- **ESLint + TypeScript** – контроль качества кода

## Основной функционал

- Добавление, редактирование и удаление задач
- Отметка задач как выполненных
- Фильтрация задач по статусу: все, активные, выполненные
- Drag-and-drop сортировка задач с сохранением позиции
- Сохранение задач в `localStorage`

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка проекта
npm run build

# Деплой проекта
npm run deploy
```

## Структура проекта

- src/entities – Redux slice и модели Todo
- src/features – фильтры и формы для работы с Todo
- src/widgets – списки Todo с drag-and-drop
- src/shared – общие хуки, утилиты и константы
- src/app – настройка store и корневой компонент
