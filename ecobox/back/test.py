import pygame
import random

# Инициализация Pygame
pygame.init()

# Размеры окна
width = 640
height = 480

# Цвета
black = (0, 0, 0)
white = (255, 255, 255)
green = (0, 255, 0)
red = (255, 0, 0)

# Создание окна
window = pygame.display.set_mode((width, height))
pygame.display.set_caption("Змейка")

clock = pygame.time.Clock()

# Размер ячейки и скорость змейки
cell_size = 20
snake_speed = 15

# Функция отрисовки змейки
def draw_snake(snake):
    for cell in snake:
        pygame.draw.rect(window, green, (cell[0], cell[1], cell_size, cell_size))

# Функция игры
def game():
    game_over = False
    game_close = False

    # Позиция и начальное направление движения змейки
    x = width // 2
    y = height // 2
    dx = 0
    dy = 0

    # Инициализация змейки
    snake = []
    snake_length = 1

    # Создание первого фрукта
    fruit_x = round(random.randrange(0, width - cell_size) / cell_size) * cell_size
    fruit_y = round(random.randrange(0, height - cell_size) / cell_size) * cell_size

    while not game_over:

        while game_close:
            # Отображение сообщения о поражении
            window.fill(black)
            font = pygame.font.SysFont(None, 30)
            message = font.render("Game Over! Нажмите Q - выход или C - сыграть снова", True, white)
            window.blit(message, (width // 2 - 200, height // 2 - 50))
            pygame.display.update()

            # Обработка событий при завершении игры
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    game_over = True
                    game_close = False
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_q:
                        game_over = True
                        game_close = False
                    if event.key == pygame.K_c:
                        game()

        # Обработка событий в игре
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                game_over = True
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT and dx != cell_size:
                    dx = -cell_size
                    dy = 0
                elif event.key == pygame.K_RIGHT and dx != -cell_size:
                    dx = cell_size
                    dy = 0
                elif event.key == pygame.K_UP and dy != cell_size:
                    dy = -cell_size
                    dx = 0
                elif event.key == pygame.K_DOWN and dy != -cell_size:
                    dy = cell_size
                    dx = 0

        # Проверка столкновений с границами окна
        if x >= width or x < 0 or y >= height or y < 0:
                   game_close = True

    # Обновление позиции змейки
    x += dx
    y += dy

    # Очистка окна
    window.fill(black)

    # Отрисовка фрукта
    pygame.draw.rect(window, red, (fruit_x, fruit_y, cell_size, cell_size))

    # Обновление позиции змейки
    snake_head = []
    snake_head.append(x)
    snake_head.append(y)
    snake.append(snake_head)

    if len(snake) > snake_length:
        del snake[0]

    # Проверка столкновений змейки с самой собой
    for segment in snake[:-1]:
        if segment == snake_head:
            game_close = True

    # Отрисовка змейки
    draw_snake(snake)

    # Обновление окна
    pygame.display.update()

    # Проверка поглощения фрукта
    if x == fruit_x and y == fruit_y:
        fruit_x = round(random.randrange(0, width - cell_size) / cell_size) * cell_size
        fruit_y = round(random.randrange(0, height - cell_size) / cell_size) * cell_size
        snake_length += 1

    # Ограничение скорости змейки
    clock.tick(snake_speed)

game()
pygame.quit()
