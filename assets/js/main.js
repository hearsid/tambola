(function ($) {
    $.fn.extend({
        numAnim: function (options) {
            if (!this.length)
                return false;

            this.defaults = {
                endAt: 2560,
                numClass: 'autogen-num',
                duration: 2,   // seconds
                interval: 90  // ms
            };
            var settings = $.extend({}, this.defaults, options);

            var $num = $('<span/>', {
                'class': settings.numClass
            });

            return this.each(function () {
                var $this = $(this);

                // Wrap each number in a tag.
                var frag = document.createDocumentFragment(),
                    numLen = settings.endAt.toString().length;
                for (x = 0; x < numLen; x++) {
                    var rand_num = Math.floor(Math.random() * 10);
                    frag.appendChild($num.clone().text(rand_num)[0])
                }
                $this.empty().append(frag);

                var get_next_num = function (num) {
                    ++num;
                    if (num > 9) return 0;
                    return num;
                };

                // Iterate each number.
                $this.find('.' + settings.numClass).each(function () {
                    var $num = $(this),
                        num = parseInt($num.text());

                    var interval = setInterval(function () {
                        num = get_next_num(num);
                        $num.text(num);
                    }, settings.interval);

                    setTimeout(function () {
                        clearInterval(interval);
                    }, settings.duration * 1000 - settings.interval);
                });

                setTimeout(function () {
                    $this.text(settings.endAt.toString());
                    $("#mirageElement").css("display", "none");
                    $('#numCounter').css("display", "");

                }, settings.duration * 1000);
            });
        }
    });
})(jQuery);

$(function () {
    var bingo = {
        selectedNumbers: [],
        generateRandom: function () {
            var min = 1;
            var max = 90;
            var random = Math.floor(Math.random() * (max - min + 1)) + min;
            return random;
        },
        generateNextRandom: function () {
            if (bingo.selectedNumbers.length > 89) {
                alert("All numbers Exhausted");
                return 0;
            }
            var random = bingo.generateRandom();
            while ($.inArray(random, bingo.selectedNumbers) > -1) {
                random = bingo.generateRandom();
            }
            bingo.selectedNumbers.push(random);
            return random;
        }
    };
    $("#mirageElement").css("display", "none");
    $('#numberTable td').each(function () {
        var concatClass = this.cellIndex + "" + this.parentNode.rowIndex;
        var numberString = parseInt(concatClass, 10).toString();
        $(this).addClass("cell" + numberString).text(numberString);
    });
    var random = 0;
    var animDuration = 2;
    $('#btnGenerate').click(function () {
        var scope = this;
        this.disabled = true;
        $('#prevNum').text($('#numCounter').text());
        random = bingo.generateNextRandom().toString();
        $("#numCounter").css("display", "none");
        $("#mirageElement").css("display", "");
        $('#numCounter').text(random);
        //$('td.cell' + random).addClass('selected');
        $("#mirageElement").numAnim({
            endAt: 90,
            duration: animDuration
        });
        setTimeout(function () {
            if (bingoNumberWords[random - 1]) {
                $("#bingoWords").text(bingoNumberWords[random - 1]);
            } else {
                $("#bingoWords").text("");
            }
            $('td.cell' + random).addClass('selected');
            $("#numCounter").animate({ zoom: '200%' }, "slow");
            $("#numCounter").animate({ zoom: '100%' }, "slow");
            scope.disabled = false;

        }, animDuration * 1000);

    });
    
    function showWarningOnReload() {
        window.onbeforeunload = function (e) {
        e = e || window.event;
        var returnString = 'Are you sure? Data may get lost.';
        if (e) {
            e.returnValue = returnString;
        }
        return returnString;
    };
    }
});

(function($) {
    const tableBody = $("#tableBody");
    function createTableCells() {
        tambolaCategories.forEach((cat, ind) => {
            const index = ind;
            const indexCell = `<td>${index+1}</td>`;
            const categoryCell = `<td>${cat}</td>`;
            const checkboxCell = `<td><input type="checkbox" class="checkbox" /></td>`;
            tableBody.append(`<tr>${indexCell} ${categoryCell} ${checkboxCell}</tr>`);
        });
    }
    $('table#categoryTable').on('click', 'td > input', function () {
        const catTd = this.parentElement.parentElement.children[1];
        if (this.checked) {
            catTd.classList.add('line-through');
        } else if (!this.checked) {
            catTd.classList.remove('line-through');
        }
    });
    createTableCells();

})(jQuery);