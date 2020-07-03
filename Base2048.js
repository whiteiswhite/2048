(function($) // début du plugin
{
    $.fn.game2048 = function() //function game2048 du plugin
    {
        var count_points=0;

        $('.reset').on('click', function(){
            $('table').replaceWith(generateMap());
            generateCell(2);
        });



        // génération du tableau (table, tr, td) vide (rempli de zéros)
        function generateMap()
        {
            let table = $('<table></table>');
            for (let y = 0; y < 4; y++)
            {
                let line = $('<tr></tr>');
                for (let x = 0; x < 4; x++)
                {
                    let cell = $('<td></td>').attr('x', x).attr('y', y).attr('nbr', 0);
                    line.append(cell);
                }
                table.append(line);
            }
            return table;
        }

        // génération d'un certain nombre de cases (argument cases) aléatoirement placées sur les cases d'attribut 'nbr=0'
        function generateCell(cells)
        {
            for (let i = 0; i < cells; i++)
            {
                let empty = false;

                while (empty === false) // tant que la case récupéré aléatoirement n'est pas vide
                {
                    let x = Math.floor((Math.random() * 4));
                    let y = Math.floor((Math.random() * 4));
                    var elem = $('[x="' + x + '"][y="' + y + '"][nbr=0]');
                    console.log(elem[0]);
                    if (elem[0])
                        empty = true;
                }

                let value =  2 * (Math.floor((Math.random() * 2) + 1));
                if (value === 4 && Math.random() > 0.5)
                    value = 2;

                elem.attr('nbr', value);
                elem.text(value);

            }
        }




        // fonction de gestion des évenements (appuie de touches)
        $('html').keydown(function(event) {
            switch (event['key']) {
                case 'ArrowLeft':
                    /*     var elemattr = $("td[x=" + x + "][y =" + y + "]").attr("nbr");
                      var elemaddr = $("[x=" + x + "][y =" + y + "]");
                      var elemattrinf = $("td[x=" + (x-1) + "][y =" + y + "]").attr("nbr");
                      var firstleft = $("td[x=" + 0 + "][y =" + y + "]").attr("nbr");
                          if ((elemattr != 0 && elemattrinf == 0) || elemattr != 0 && firstleft==0){
                        let eleminf = $('[x="' + (x-1) + '"][y="' + y + '"]');
                            eleminf.attr('nbr', elemattr);
                            eleminf.text(elemattr);
                            elemaddr.attr('nbr', 0);
                            elemaddr.text('');
                    }*/

                    moveLeft();
                    console.log("Left");
                    break;




                case 'ArrowUp':
                    moveUp();
                    console.log("Up");
                    break;


                case 'ArrowRight':
                    moveRight();
                    console.log("Right");
                    break;

                case 'ArrowDown':
                    moveDown();
                    console.log("Down");
                    break;
            }
        });


        // début du code lancé
        $(this).append(generateMap()); // génération du tableau vide
        generateCell(2); // génération aléatoire de deux cases pleines (2 ou 4)





        $(".box_points").text("Score: "+ count_points);




//FONCTION POUR BOUGER A GAUCHE
        function moveLeft(){
          var canMove = false;
          var canMerge = false;
            // Can Move
            for (let y = 0; y < 4; y++){
                for (let x = 0; x < 4; x++){
                    let elemattr = $("td[x=" + x + "][y=" + y + "]").attr("nbr");
                    if (elemattr > 0){
                    for(let i = 0; i < x; i++){
                        let nextelemattr = $("td[x=" + i + "][y=" + y + "]").attr("nbr");
                        if (nextelemattr == 0){
                            canMove = true;
                        }
                    }
                    }
                }
                }
            //Move Left
            if(canMove == true){
                for (let y = 0; y < 4; y++){
                    for (let x = 0; x < 4; x++){

                      //  var moved = false;
                        while ($("td[x=" + x + "][y=" + y + "]").attr("nbr") != 0 && x < 4){
                            x++;
                        }

                        var i = x;

                        while ($("td[x=" + (i) + "][y=" + y + "]").attr("nbr") == 0 && i < 4){
                            i++;
                        }

                        if(i != 0){
                            let nextelemaddr = $("[x=" + i + "][y =" + y + "]");
                            let nextelemattr = $("td[x=" + (i) + "][y=" + y + "]").attr("nbr");
                            let elemaddr = $("[x=" + x + "][y =" + y + "]");
                            //let elemattr = $("td[x=" + x + "][y=" + y + "]").attr("nbr");
                           // var currentvalue =

                                elemaddr.attr('nbr', nextelemattr);
                                elemaddr.text(nextelemattr);

                                nextelemaddr.attr('nbr', 0);
                                nextelemaddr.text('');

                        }

                    }

                }
               // generateCell(1);
            }
            // Can Merge
            for (let y = 0; y < 4; y++){
                for (let x = 0; x < 4; x++){
                    let elemattr = $("td[x=" + x + "][y=" + y + "]").attr("nbr");
                    let elemaddr = $("td[x=" + x + "][y=" + y + "]");
                    let nextelemattr = $("td[x=" + (x+1) + "][y=" + y + "]").attr("nbr");
                    let nextelemaddr = $("td[x=" + (x+1) + "][y=" + y + "]");

                    if (elemattr==nextelemattr && elemattr != 0 && nextelemattr != 0){
                        canMerge=true;
                        let mergedval = elemattr * 2;
                        count_points = count_points + mergedval;
                        console.log(count_points);
                        elemaddr.attr('nbr', mergedval);
                        elemaddr.text(mergedval);

                        nextelemaddr.attr('nbr', 0);
                        nextelemaddr.text('')
                    }
                }

            }
            if (canMerge == true || canMove == true)
                generateCell(1);
    }

//FONCTION POUR BOUGER A DROITE

        function moveRight() {
            var canMove = false;
            var canMerge = false;
            // Can Move
            for (let y = 0; y < 4; y++) {
                for (let x = 4; x >= 0; x--) {
                    let elemattr = $("td[x=" + x + "][y=" + y + "]").attr("nbr");
                    if (elemattr > 0) {
                        for (let i = 4; i > x; i--) {
                            let nextelemattr = $("td[x=" + i + "][y=" + y + "]").attr("nbr");
                            if (nextelemattr == 0) {
                                canMove = true;
                            }
                        }
                    }
                }
            }
            // Move Right
            if (canMove == true) {
                for (let y = 0; y < 4; y++) {
                    for (let x = 4; x > 0; x--) {

                        while ($("td[x=" + x + "][y=" + y + "]").attr("nbr") != 0 && x >= 0) {
                            x--;
                        }

                        let i = x;

                        while ($("td[x=" + (i) + "][y=" + y + "]").attr("nbr") == 0 && i >= 0) {
                            i--;
                        }
                        if (i != 4) {
                            let nextelemaddr = $("[x=" + i + "][y =" + y + "]");
                            let nextelemattr = $("td[x=" + (i) + "][y=" + y + "]").attr("nbr");
                            var elemaddr = $("[x=" + x + "][y =" + y + "]");

                            elemaddr.attr('nbr', nextelemattr);
                            elemaddr.text(nextelemattr);

                            nextelemaddr.attr('nbr', 0);
                            nextelemaddr.text('');
                        }
                    }
                }
            }
            // Can Merge
            for (let y = 0; y < 4; y++){
                for (let x = 4; x > 0; x--){
                    let elemattr = $("td[x=" + x + "][y=" + y + "]").attr("nbr");
                    let elemaddr = $("td[x=" + x + "][y=" + y + "]");
                    let nextelemattr = $("td[x=" + (x-1) + "][y=" + y + "]").attr("nbr");
                    let nextelemaddr = $("td[x=" + (x-1) + "][y=" + y + "]");

                    if (elemattr==nextelemattr && elemattr != 0 && nextelemattr != 0){
                        canMerge=true;
                        let mergedval = elemattr * 2;
                        elemaddr.attr('nbr', mergedval);
                        elemaddr.text(mergedval);

                        nextelemaddr.attr('nbr', 0);
                        nextelemaddr.text('')
                    }
                }
            }
            if (canMerge == true || canMove == true)
                generateCell(1);
        }

//FONCTION POUR BOUGER VERS LE HAUT

        function moveUp() {
            var canMove = false;
            var canMerge = false;
            // Can Move
            for (let x = 0; x < 4; x++) {
                for (let y = 0; y < 4; y++) {
                    let nextelemattr = $("td[x=" + x + "][y=" + y + "]").attr("nbr");
                    if (nextelemattr > 0) {
                        for (let i = 0; i < y; i++) {
                            let nextelemattr = $("td[x=" + x + "][y=" + i + "]").attr("nbr");
                            if (nextelemattr == 0) {
                                canMove = true;
                            }
                        }
                    }
                }
            }
            // Move Up
            if (canMove == true) {
            for (let x = 0; x < 4; x++) {
                for (let y = 0; y < 4; y++) {

                    while ($("td[x=" + x + "][y=" + y + "]").attr("nbr") != 0 && y < 4) {
                        y++;
                    }

                    let i = y;

                    while ($("td[x=" + x + "][y=" + (i) + "]").attr("nbr") == 0 && y < 4) {
                        i++;
                    }
                    if (i != 4) {
                        let nextelemaddr = $("[x=" + x + "][y =" + i + "]");
                        let nextelemattr = $("td[x=" + x + "][y=" + (i) + "]").attr("nbr");
                        var elemaddr = $("[x=" + x + "][y =" + y + "]");

                        elemaddr.attr('nbr', nextelemattr);
                        elemaddr.text(nextelemattr);

                        nextelemaddr.attr('nbr', 0);
                        nextelemaddr.text('');
                    }
                }
            }
        }
            // Can Merge
            for (let x = 0; x < 4; x++){
                for (let y = 0; y < 4; y++){
                    let elemattr = $("td[x=" + x + "][y=" + y + "]").attr("nbr");
                    let elemaddr = $("td[x=" + x + "][y=" + y + "]");
                    let nextelemattr = $("td[x=" + (x) + "][y=" + (y+1) + "]").attr("nbr");
                    let nextelemaddr = $("td[x=" + (x) + "][y=" + (y+1) + "]");

                    if (elemattr==nextelemattr && elemattr != 0 && nextelemattr != 0){
                        canMerge=true;
                        let mergedval = elemattr * 2;
                        elemaddr.attr('nbr', mergedval);
                        elemaddr.text(mergedval);

                        nextelemaddr.attr('nbr', 0);
                        nextelemaddr.text('')
                    }
                }

            }
            if (canMerge == true || canMove == true)
                generateCell(1);
        }

//FONCTION POUR BOUGER VERS LE BAS
        function moveDown() {
            var canMove = false;
            var canMerge = false;
                // Can Move
            for (let x = 0; x < 4; x++) {
                for (let y = 4; y >= 0; y--) {
                    let nextelemattr = $("td[x=" + x + "][y=" + y + "]").attr("nbr");
                    if (nextelemattr > 0) {
                        for (let i = 4; i > y; i--) {
                            let nextelemattr = $("td[x=" + x + "][y=" + i + "]").attr("nbr");
                            if (nextelemattr == 0) {
                                canMove = true;
                            }
                        }
                    }
                }
            }
                // Move Down
            if (canMove == true) {
            for (let x = 0; x < 4; x++) {
                for (let y = 4; y > 0; y--) {

                    while ($("td[x=" + x + "][y=" + y + "]").attr("nbr") != 0 && y >= 0) {
                        y--;
                    }

                    let i = y;

                    while ($("td[x=" + x + "][y=" + (i) + "]").attr("nbr") == 0 && y >= 0) {
                        i--;
                    }
                    if (i != 4) {
                        let nextelemaddr = $("[x=" + x + "][y =" + i + "]");
                        let nextelemattr = $("td[x=" + x + "][y=" + (i) + "]").attr("nbr");
                        var elemaddr = $("[x=" + x + "][y =" + y + "]");

                        elemaddr.attr('nbr', nextelemattr);
                        elemaddr.text(nextelemattr);

                        nextelemaddr.attr('nbr', 0);
                        nextelemaddr.text('');
                    }
                }
            }
        }
                // Can Merge
            for (let x = 0; x < 4; x++){
                for (let y = 4; y > 0; y--){
                    let elemattr = $("td[x=" + x + "][y=" + y + "]").attr("nbr");
                    let elemaddr = $("td[x=" + x + "][y=" + y + "]");
                    let nextelemattr = $("td[x=" + (x) + "][y=" + (y-1) + "]").attr("nbr");
                    let nextelemaddr = $("td[x=" + (x) + "][y=" + (y-1) + "]");

                    if (elemattr==nextelemattr && elemattr != 0 && nextelemattr != 0){
                        canMerge=true;
                        let mergedval = elemattr * 2;
                        elemaddr.attr('nbr', mergedval);
                        elemaddr.text(mergedval);

                        nextelemaddr.attr('nbr', 0);
                        nextelemaddr.text('')
                    }
                }
            }
            if (canMerge == true || canMove == true)
                generateCell(1);
        }
    }











})(jQuery); // fin du pluggin
//$(document).ready(btnReset);