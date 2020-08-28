def display_grid_points(x_margin, y_margin, num_rows, num_cols, sep):

    for row in range(num_rows):
        for col in range(num_cols):
            x = x_margin + sep * col
            y = y_margin + sep * row
            ellipse(x, y, 3, 3)


def display_grid_squares(x_margin, y_margin, num_rows, num_cols, sep):
    """
    Display small squares around grid vertics
    """

    for row in range(num_rows):
        for col in range(num_cols):
            x = x_margin + sep * col
            y = y_margin + sep * row
            ellipse(x, y, 3, 3)
            pushMatrix()
            translate(x, y)
            noFill()
            rect(0, 0, 20, 20)
            popMatrix()


def keyPressed():
    global show, circles

    if key == "n":
        circles = []
        c0 = Circle(width / 3, height / 2, 20, 0, 0, 0)
        circles.append(c0)
    elif key == "t":  # Toggle
        show = not show

    elif key == CODED and keyCode == CONTROL:
        saveFrame("screenshot.png")
    elif key == ENTER:
        if msg:
            t = Texto(msg)


def pick_one(_lst):
    """ randomly picks one from a list of 2 """
    if len(_lst) == 2:
        return _lst[0] if int(random(2)) else _lst[1]
    elif len(_lst) == 3:
        return _lst[int(random(3))]

