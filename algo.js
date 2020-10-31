function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

function forceStop() {
    $("#loop_break").val("1");
    $("#stop_loop_button").hide();
    $("#start_loop_button").show();
    $("#start_loop_button").text("Simulate Again");
}

var BubbleSortAlgo = async (array, size, delay) => {
    for (var i = 0; i < size; i++) {
        check = 0;
        for (var j = 0; j < size - 1-i; j++) {
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
            makePattern(array, delay)
            await sleep(delay);
            showArray(array, "final_array");
        }

        if(check==0){
            $("#start_loop_button").text("Simulate Again");
            break;
        }
    }
}

function makePattern(new_array, delay) {
    $("#pallet").empty()
    new_array.forEach(element => {
        $("#pallet").append(`<div style="height: ${element}px;width:35px;background-color: green;margin-bottom:3px;margin-right: 2px;margin-left: 2px;" class="text-light text-center">${element}</div>`)
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
    $("#stop_loop_button").show();
    $("#start_loop_button").hide();
    $("#loop_break").val("0");
    var size = $("#size_of_array").val();
    for (var random_array = [], i = 0; i < size; ++i) {
        random_array[i] = Math.floor(Math.random() * 200) + 50
    };
    delay = $("#speed_of_algo").val();
    showArray(random_array, "initial_array")
    $("#array_div").show()
    algo=$("#algoritm").val();
    if(algo==1){
        BubbleSortAlgo(random_array, size, delay)
    }
}
