import copy

lights = []

size = 10

for i in range(0, size):
    lights.append([])
    for j in range(0, size):
        lights[i].append('O')

lights[3][3] = 'B'
for i in range(0, size):
    print(lights[i])
    # print("\n")



print("new things here")


growth_up = 1
growth_down = 1
growth_left = 1
growth_right = 1

for iteration in range(1, 5):
    new_lights = copy.deepcopy(lights)
    for i in range(0, size):
        for j in range(0, size):
            # have growth here
            if lights[i][j] == 'B':
                if (i + growth_up < size):
                    new_lights[i + growth_up][j] = 'B'
                if (i - growth_down >= 0):
                    new_lights[i - growth_down][j] = 'B'
                if (j - growth_left >= 0):
                    new_lights[i][j - growth_left] = 'B'
                if (j + growth_right < size):
                    new_lights[i][j + growth_right] = 'B'
    

    # now print
    for i in range(0, size):
        print(new_lights[i])
        # print("\n")
    print("new generation")
    print("\n")
    lights = new_lights
