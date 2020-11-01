function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

function forceStop() {
    $("#loop_break").val("1");
    $("#stop_loop_button").hide();
    $("#start_loop_button").show();
    $("#start_loop_button").text("Simulate Again");
}

var BubbleSortAlgo = async (array, size, delay, width_of_bar) => {
    for (var i = 0; i < size; i++) {
        check = 0;
        for (var j = 0; j < size - 1 - i; j++) {
            if ($("#loop_break").val() == 1) {
                console.log("Manually Stopped")
                break;
            }
            temp = array[j]
            if (temp > array[j + 1]) {
                array[j] = array[j + 1]
                array[j + 1] = temp
                check = 1
            }
            if (delay != 0) {
                makePattern(array, width_of_bar)
                await sleep(delay);
            }
            showArray(array, "final_array");
        }

        if (check == 0) {
            break;
        }
    }
    makePattern(array, width_of_bar)
    $("#stop_loop_button").hide();
    $("#start_loop_button").show();
    $("#start_loop_button").text("Simulate Again");
    if ($("#loop_break").val() != 1) {
        $(".sorted_bar").css("background-color", "green")
        $(".sorted_bar").css("color", "white")
    }
}
var SelectionSort = async (array, size, delay, width_of_bar) => {
    for (var i = 0; i < size; i++) {
        min = array[i];
        min_index = i
        for (var j = i; j < size; j++) {
            if (min > array[j]) {
                min = array[j]
                min_index = j
            }
            makePattern(array, width_of_bar)
            await sleep(delay);
            showArray(array, "final_array");
        }
        array[min_index] = array[i]
        array[i] = min
    }

    makePattern(array, width_of_bar)
    $("#stop_loop_button").hide();
    $("#start_loop_button").show();
    $("#start_loop_button").text("Simulate Again");
    $(".sorted_bar").css("background-color", "green")
    $(".sorted_bar").css("color", "white")
}

var InsertionSort = async (array, size, delay, width_of_bar) => {
    for (var i = 0; i < size; i++) {
        hole = i;
        while (i > 0 && array[hole] < array[hole - 1]) {
            temp = array[hole]
            array[hole] = array[hole - 1]
            array[hole - 1] = temp
            hole = hole - 1
            check = 1
            if (delay != 0) {
                makePattern(array, width_of_bar)
                await sleep(delay);
            }
            showArray(array, "final_array");
        }
    }
    makePattern(array, width_of_bar)
    $("#stop_loop_button").hide();
    $("#start_loop_button").show();
    $("#start_loop_button").text("Simulate Again");
    $(".sorted_bar").css("background-color", "green")
    $(".sorted_bar").css("color", "white")

}

function makePattern(new_array, width_of_bar) {
    $("#pallet").empty()
    new_array.forEach(element => {
        if (width_of_bar > 20) {
            text = element
        } else {
            text = ""
        }
        $("#pallet").append(`<div style="height: ${element}px;width:${width_of_bar}px;background-color: yellow;margin-bottom:3px;margin-right: 2px;margin-left: 2px;color:black" class="sorted_bar text-center">${text}</div>`);
    });
}

function showArray(arr, div_name) {
    let str = ""
    $.each(arr, function (index, value) {
        str = str + ", " + value
        div = "#" + div_name
        $(div).text("[" + str.slice(2) + "]");
    })
}

function runcode() {
    $("#pallet").empty()

    $("#stop_loop_button").show();
    $("#start_loop_button").hide();
    $("#loop_break").val("0");
    $("#array_div").show()
    $("#initial_array").text("Genrating Array");

    var size = $("#size_of_array").val();
    for (var random_array = [], i = 0; i < size; ++i) {
        random_array[i] = Math.floor(Math.random() * 200) + 50
    };
    delay = $("#speed_of_algo").val();
    fixed_array = [500, 400, 300, 200, 600]
    showArray(random_array, "initial_array")
    algo = $("#algoritm").val();
    width_of_bar = $(window).width() * .7 / size
    if (width_of_bar > 50) {
        width_of_bar = 50;
    }
    if (width_of_bar < 10) {
        width_of_bar = 5;
    }

    pallet_width = size * width_of_bar + 4 * size + 40
    $("#pallet").css('width', `${pallet_width}px`)

    if (algo == 1) {
        BubbleSortAlgo(random_array, size, delay, width_of_bar)
    } if (algo == 2) {
        InsertionSort(random_array, size, delay, width_of_bar)
    } if (algo == 3) {
        SelectionSort(random_array, size, delay, width_of_bar)
    }
}
