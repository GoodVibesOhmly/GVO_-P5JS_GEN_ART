import math
import colors

SPEED_LIMIT = 10


def ball_dist(b1, b2):
    """ Euclidean distance between two ball """
    return math.sqrt((b1.x - b2.x) ** 2 + (b1.y - b2.y) ** 2)


def speed_limit(comp):
    """Don't let it go beyond -1*SPEED_LIMIT or +1*SPEED_LIMIT"""
    return max(min(comp, SPEED_LIMIT), -1 * SPEED_LIMIT)


def next_color(num):
    return (num + 1) % len(colors.COLORS)


class Ball(object):
    def __init__(self, _id, _x, _y, _vx=0, _vy=0, _radius=0, _colornum=0):
        self.x, self.y = _x, _y
        self.vx, self.vy = _vx, _vy
        self.id = _id
        # store the starting coords of each ball. For relaunching.
        self.startx, self.starty = _x, _y
        self.active = False
        self.radius = _radius
        self.color = _colornum
        self.prev_collision = -3  # frameCount when the collision occurred

    def move(self):
        self.x += self.vx
        self.y += self.vy

        # check for out of bounds
        if self.x > width or self.x < 0:
            self.vx *= -1
        if self.y > height or self.y < 0:
            self.vy *= -1

    def display(self):
        fill(*colors.COLORS[self.color])
        ellipse(self.x, self.y, 2 * self.radius, 2 * self.radius)
        # print("ball", self.id, self.vy, self.y)

    def collide(self, balls):
        # check with all the other balls to see if colliding...
        for b in balls:
            if (
                frameCount > self.prev_collision + 5
            ):  # hack to avoid successive collision
                if self.id < b.id:  # check n^2/ 2 pairs.
                    min_dist = self.radius + b.radius
                    if ball_dist(b, self) < min_dist - 0.5:

                        b.vx, self.vx = self.vx, b.vx
                        b.vy, self.vy = self.vy, b.vy
                        b.color = next_color(b.color)
                        self.color = next_color(self.color)
                        self.prev_collision = frameCount
                        b.prev_collision = frameCount

