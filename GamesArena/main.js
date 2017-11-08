/**
 * Created by ani41 on 10/28/2017.
 */
$(function () {
    let $games = $('#gameList');
    var $arr = [];

    $.ajax({
        type: 'GET',
        url: 'http://starlord.hackerearth.com/gamesarena',
        success: function (games) {
            for (let i = 1; i < games.length; i++) {
                $arr[i - 1] = games[i];
                $games.append('<div id="card" class=" card text-center border-light m-1" ><div class="card-body"><div class="card-title"> Title : ' + games[i].title + '</div><p class="card-text"> Platform : ' + games[i].platform + '</p><p class="card-text"> Game Score ' + games[i].score + '</p><p class="card-text"> Genre : ' + games[i].genre + '</p><p class="card-text"> Editors Pick : ' + games[i].editors_choice + '</p></div></div>');
            }
        }
    });
    $('#search').keyup(function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
        let $val = $('#search').val();
        console.log($val);
        //if ($val.length > 0 && (!(e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40))) {
        //  $games.children().fadeOut('slow', function () {
        $games.empty();
        //});
        for (let i = 0; i < $arr.length; i++) {
            let $str = $arr[i].title.toLowerCase($arr[i].title);
            if ($val !== $str && $val > 0) {
                $games.empty();
            }
            else if ($val === $str) {
                $games.append('<div class="card text-center border-light m-1" ><div class="card-body"><div class="card-title"> Title : ' + $arr[i].title + '</div><p class="card-text"> Platform : ' + $arr[i].platform + '</p><p class="card-text"> Game Score ' + $arr[i].score + '</p><p class="card-text"> Genre : ' + $arr[i].genre + '</p><p class="card-text"> Editors Pick : ' + $arr[i].editors_choice + '</p></div></div>');
            }
        }
    });
    $('#button').click(function () {
        $games.fadeOut('fast', function () {

            $games.empty();
            console.log($arr);
        });
        $arr.sort(function (scoreFirst, scoreSecond) {
            return scoreFirst.score - scoreSecond.score;
        });
        console.log($arr);
        $games.fadeIn('slow', function () {
            for (let i = 0; i < $arr.length; i++) {
                $games.append('<div class="card text-center border-light m-1" ><div class="card-body"><div class="card-title"> Title : ' + $arr[i].title + '</div><p class="card-text"> Platform : ' + $arr[i].platform + '</p><p class="card-text"> Game Score ' + $arr[i].score + '</p><p class="card-text"> Genre : ' + $arr[i].genre + '</p><p class="card-text"> Editors Pick : ' + $arr[i].editors_choice + '</p></div></div>');
            }
        });
    });
});


