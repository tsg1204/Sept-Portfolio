$(document).ready(function(){

     //Creat attacker and defender objects  
        var attacker = {
            name: '',
            HP: 0,
            powers: 0,
            attackPowers: 0
        };
        var defender = {
            name: '',
            HP: 0,
            counterAttackPowers: 0
        };
        var enemiesCount = 3;
        var chooseAgain = false;
        var attHP = 0;
        var defHP = 0;

        console.log(enemiesCount);
        //hide titles 
        $('#titleYou').hide();
        $('#titleEnem').hide();
        $('#titleDef').hide();
        $('#yPowers').hide();
        $('#defPowers').hide();
        $('#btn-start'). hide();

//choose a charachter to play, others will be in enemie camp
    $('.characters').on("click", function(){
        var imgId = $(this).attr('id');
        console.log(imgId);
        $('.characters').hide();
        $('#titleFirst').hide();
        $("#attacker").addClass('thumbnail');
        if (imgId =='heracles') {
            //object new properties
            attacker.name = 'Heracles';
            attacker.HP = 120;
            attacker.powers = 8;

            $("#attacker").append('<img src="assets/images/heracles.jpg"/>'); 
            $('#attacker').append('<div class="character-name player">Heracles ' + attacker.HP + '</div>');
            $('#titleYou').show();
            $('#titleEnem').show();
            $('#enemies').append('<div id="achilles2" class="col-xs-offset-0 col-lg-offset-2 col-sm-4 col-lg-2 thumbnail enemies"><img src="assets/images/achilles.jpg"/></div>');

            $('#enemies').append('<div id="perseus2"class=" col-sm-4 col-lg-2 thumbnail enemies"><img src="assets/images/perseus.jpg"/></div>');

            $('#enemies').append('<div id="zeus2" class=" col-sm-4 col-lg-2 thumbnail enemies"><img src="assets/images/zeus.jpg"/></div>');

        };

        if (imgId == 'perseus') {
            //object new properties
            attacker.name = 'Perseus';
            attacker.HP = 100;
            attacker.powers = 12;

            $("#attacker").append('<img src="assets/images/perseus.jpg"/>'); 
            $('#attacker').append('<div class="character-name player">Perseus ' + attacker.HP + '</div>');
            $('#titleYou').show();
            $('#titleEnem').show();
            $('#enemies').append('<div id="achilles2" class="col-sm-4 col-lg-2 thumbnail enemies"><img src="assets/images/achilles.jpg"/></div>');

            $('#enemies').append('<div id="heracles2"class="col-sm-4 col-lg-2 thumbnail enemies"><img src="assets/images/heracles.jpg"/></div>');

            $('#enemies').append('<div id="zeus2" class="col-sm-4 col-lg-2 thumbnail enemies"><img src="assets/images/zeus.jpg"/></div>');
        };
        if (imgId == 'zeus') {
            //object new properties
            attacker.name = 'Zeus';
            attacker.HP = 180;
            attacker.powers = 10;

            $("#attacker").append('<img src="assets/images/zeus.jpg"/>'); 
            $('#attacker').append('<div class="character-name player">Zeus ' + attacker.HP + '</div>');
            $('#titleYou').show();
            $('#titleEnem').show();
            $('#enemies').append('<div id="achilles2" class="col-sm-4 col-lg-2 thumbnail enemies"><img src="assets/images/achilles.jpg"/></div>');

            $('#enemies').append('<div id="perseus2"class="col-sm-4 col-lg-2 thumbnail enemies"><img src="assets/images/perseus.jpg"/></div>');

            $('#enemies').append('<div id="heracles2" class="col-sm-4 col-lg-2 thumbnail enemies"><img src="assets/images/heracles.jpg"/></div>');
        };
        if (imgId == 'achilles') {
            //object new properties
            attacker.name = 'Achilles';
            attacker.HP = 150;
            attacker.powers = 6;

            $("#attacker").append('<img src="assets/images/achilles.jpg"/>'); 
            $('#attacker').append('<div class="character-name player">Achilles ' + attacker.HP + '</div>');
            $('#titleYou').show();
            $('#titleEnem').show();
            $('#enemies').append('<div id="heracles2" class="col-sm-4 col-lg-2 thumbnail enemies"><img src="assets/images/heracles.jpg"/></div>');

            $('#enemies').append('<div id="perseus2" class="col-sm-4 col-lg-2 thumbnail enemies"><img src="assets/images/perseus.jpg"/></div>');

            $('#enemies').append('<div id="zeus2" class="col-sm-4 col-lg-2 thumbnail enemies"><img src="assets/images/zeus.jpg"/></div>');
            console.log(attacker.name);
        };

    //choose your enemy


        $('.enemies').on("click", function(){
            var imgId = $(this).attr('id');
            console.log(imgId);
            $(this).remove();
            $("#btn-attack").removeAttr('disabled');

            if (chooseAgain === true) {
                $("#choose").remove();
                $("<div id=defender> </div>").insertAfter($('#titleDef'));
                defender.HP = 0;
            }
            
            if (imgId == 'heracles2') {
                defender.name = 'Heracles';
                defender.HP = 120;
                defender.counterAttackPowers = 10;
                $('#titleDef').show();
                $("#defender").append('<img src="assets/images/heracles.jpg"/>'); 
                $("#defender").append('<div class="character-name defender">Heracles ' + defender.HP + '</div> ');
            }
            if (imgId == 'perseus2') {
                defender.name = 'Perseus';
                defender.HP = 100;
                defender.counterAttackPowers = 15; 
                $('#titleDef').show();
                $("#defender").append('<img src="assets/images/perseus.jpg"/>'); 
                $("#defender").append('<div class="character-name defender">Perseus ' + defender.HP + '</div> ');
            }
            if (imgId == 'zeus2') {
                defender.name = 'Zeus';
                defender.HP = 180;
                defender.counterAttackPowers = 25;
                $('#titleDef').show();
                $("#defender").append('<img src="assets/images/zeus.jpg"/>'); 
                $("#defender").append('<div class="character-name defender">Zeus ' + defender.HP + '</div> '); 
            }
            if (imgId == 'achilles2') {
                defender.name = 'Achilles';
                defender.HP = 150;
                defender.counterAttackPowers = 20; 
                $('#titleDef').show();
                $("#defender").append('<img src="assets/images/achilles.jpg"/>'); 
                $("#defender").append('<div class="character-name defender">Achilles ' + defender.HP + '</div> '); 
            }
            $('#enemies').addClass('move-right');
            $("#defender").addClass('thumbnail');
            console.log(defender.name);
        });

    //attack
        $('#btn-attack').on("click", function(){

            attacker.attackPowers = attacker.attackPowers + attacker.powers;
            attacker.HP = attacker.HP - defender.counterAttackPowers;
            defender.HP = defender.HP - attacker.attackPowers;
            $( ".player").replaceWith('<div class="character-name player">' + attacker.name + ' ' + attacker.HP + '</div> ');
            $( ".defender").replaceWith('<div class="character-name defender">' + defender.name + ' ' + defender.HP + '</div> ');

            $('#yPowers').show();
            $('#defPowers').show();
            $('#yPowers').html('You attacked ' + defender.name + ' for ' + attacker.attackPowers + ' damage.');

            $('#defPowers').html(defender.name + ' attacked you back for ' + defender.counterAttackPowers + ' damage.');

           // console.log('Attacker: ' + attacker.name + ' ' + attacker.attackPowers + ' HP: ' + attacker.HP);
           // console.log('Defender: ' + defender.name + ' ' + defender.counterAttackPowers + ' HP: ' + defender.HP);
           // console.log(enemiesCount);
            
            newTarget(defender.HP);

           // console.log(enemiesCount);

            if (attacker.HP <= 0) {
                gameOver();
            }

            if (defender.HP <= 0 && enemiesCount === 0) {
                gameWon();
            };           
        });
        //new enemy
        function newTarget(health) {
            if (health <= 0 && enemiesCount > 0) {
                //new target
                enemiesCount = enemiesCount - 1;

                $("#defender").remove();
                $("<div id=choose class='col-sm-4 col-lg-2'>Choose another opponent!</div>").insertAfter($('#titleDef'));
                $('#yPowers').hide();
                $('#defPowers').hide();
                chooseAgain = true;
            };            
        }
        //lost
        function gameOver() {     
            //lost
            $("#choose").remove();
            $('#win-lost').html('Game is over! You lost. :(');
            $('#yPowers').hide();
            $('#defPowers').hide();
            $('#btn-start'). show();  
            $('.enemies').hide();
        }
        //won
        function gameWon() {
            //won!
            $("#choose").remove();
            $('#win-lost').html('Game is over! You won! :)');
            $('#yPowers').hide();
            $('#defPowers').hide();
            $('#btn-start'). show();  
            $('.enemies').hide();
        }

    });

    //start again
    $('#btn-start').on("click", function(){
        location.reload();
    });
});

