def shuffle(_list):

    #    for i from 0 to n−2 do
    #     j ← random integer such that i ≤ j < n
    #     exchange a[i] and a[j]

    n = len(_lst)
    for i in range(0, n - 2):
        j = int(random(i, n))
        _lst[i], _lst[j] = _lst[j], _lst[i]

    return _lst


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
    elif key == "f":  # freeze
        noLoop()
    elif key == "r":  # resume
        loop()
    elif key == "g":  # inch forward - slo motion
        redraw()


def pick_one(_lst):
    """ randomly picks one from a list of items """
    return _lst[int(random(len(_lst)))]

