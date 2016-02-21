/* Short URL: https://git.io/vgQgh */
function getMyPrograms(){
    var dataConnector = "";
    var program10 = [];
    program10[0] = "<div><h2>Auto Typer</h2>";
    program10[1] = "<a href=\"https://www.dropbox.com/s/uf5m9xk0pkveqk0/Auto%20Typer.exe?dl=0\" target=\"_blank\">Download Link</a>";
    program10[2] = "<hr><p><b>Application Type:</b> Windows Form | <b>Extension:</b> .exe | <b>Language:</b> C# | <b>Size:</b> 20.50KB</p><hr>";
    program10[3] = "<p>Auto types custom text at custom intervals. Auto clicks at custom intervals. Game Macro creator</p></div>";
    var program9 = [];
    program9[0] = "<div><h2>Text Modifier</h2>";
    program9[1] = "<a href=\"https://www.dropbox.com/s/w9bf1x8bty6q3i5/Text%20Modifier.exe?dl=0\" target=\"_blank\">Download Link</a>";
    program9[2] = "<hr><p><b>Application Type:</b> Windows Form | <b>Extension:</b> .exe | <b>Language:</b> C# | <b>Size:</b> 15.50KB</p><hr>";
    program9[3] = "<p>Remove all whitespace/paragraphs (line breaks). Make all characters uppercase or lowercase. Custom replacer.</p></div>";
    var program8 = [];
    program8[0] = "<div><h2>Encryptor</h2>";
    program8[1] = "<A href=\"https://www.dropbox.com/s/llgigffb1z2uncf/Encryption.exe?dl=0\" target=\_blank\">Download Link</a>";
    program8[2] = "<hr><p><b>Application Type:</b> Windows Form | <b>Extension:</b> .exe | <b>Language:</b> C# | <b>Size:</b> 21.50KB</p><hr>";
    program8[3] = "<p>Accepts any english keyboard character and encrypts it. Can also decrypt.</p></div>";
    var program7 = [];
    program7[0] = "<div><h2>Minecraft Damage Calculator</h2>";
    program7[1] = "<a href=\"https://www.dropbox.com/s/2rvtv3334wbkeya/MCDamage.exe?dl=0\" target=\"_blank\">Download Link</a>";
    program7[2] = "<hr><p><b>Application Type:</b> Console | <b>Extension:</b> .exe | <b>Language:</b> C++ | <b>Size:</b> 1.27MB</p><hr>";
    program7[3] = "<p>A small program that calculates the damage you may recieve against enemies.</p></div>";
    var program6 = [];
    program6[0] = "<div><h2>Tic Tac Toe</h2>";
    program6[1] = "<a href=\"https://www.dropbox.com/s/nnjqewyllh2gixb/TTT.exe?dl=0\" target=\"_blank\">Download Link</a>";
    program6[2] = "<hr><p><b>Application Type:</b> Console | <b>Extension:</b> .exe | <b>Language:</b> C++ | <b>Size:</b> 1.26MB</p><hr>";
    program6[3] = "<p>Play Tic Tac Toe against another human, against a computer, or place two computers against each other.</p></div>";
    var program5 = [];
    program5[0] = "<div><h2>&lt;/br&gt; Adder</h2>";
    program5[1] = "<a href=\"https://www.dropbox.com/s/k1n9ymigk5zt1xa/br%20Adder.exe?dl=0\" target=\"_blank\">Download Link</a>";
    program5[2] = "<hr><p><b>Application Type:</b> Console | <b>Extension:</b> .exe | <b>Language:</b> C++ | <b>Size:</b> 1.26MB</p><hr>";
    program5[3] = "<p>Adds &lt;/br&gt; to a HTML file, different logic options are available.</p></div>";
    var program4 = [];
    program4[0] = "<div><h2>Random Winner</h2>";
    program4[1] = "<a href=\"https://www.dropbox.com/s/k31092wqa9zjykf/Random%20Winner.exe?dl=0\" target=\"_blank\">Download Link</a>";
    program4[2] = "<hr><p><b>Application Type:</b> Console | <b>Extension:</b> .exe | <b>Language:</b> C++ | <b>Size:</b> 1.25MB</p><hr>";
    program4[3] = "<p>This program allows you to enter multiple users, rounds, and usernames then selects a winner from each round, removing that user from the next.</p></div>";
    var program3 = [];
    program3[0] = "<div><h2>Colour Tester</h2>";
    program3[1] = "<a href=\"https://www.dropbox.com/s/zzvwpe3tnuu94sb/Colour%20Tester.exe?dl=0\" target=\"_blank\">Download Link</a>";
    program3[2] = "<hr><p><b>Application Type:</b> Console | <b>Extension:</b> .exe | <b>Language:</b> C++ | <b>Size:</b> 1.65MB</p><hr>";
    program3[3] = "<p>This program lets you select a font colour and a background colour in a console window.</p></div>";
    var program2 = [];
    program2[0] = "<div><h2>ASCII Converter</h2>";
    program2[1] = "<a href=\"https://www.dropbox.com/s/j7bonhwbi9xlq6u/ASCII%20Converter.exe?dl=0\" target=\"_blank\">Download Link</a>";
    program2[2] = "<hr><p><b>Application Type:</b> Console | <b>Extension:</b> .exe | <b>Language:</b> C++ | <b>Size:</b> 1.25MB</p><hr>";
    program2[3] = "<p>This program lets you press any key on the keyboard to view its ASCII value.</p></div>";
    var program1 = [];
    program1[0] = "<div><h2>Paint</h2>";
    program1[1] = "<a href=\"https://www.dropbox.com/s/v5fkka16k39ovhe/Paint.exe?dl=0\" target=\"_blank\">Download Link</a>";
    program1[2] = "<hr><p><b>Application Type:</b> Console | <b>Extension:</b> .exe | <b>Language:</b> C++ | <b>Size:</b> 1.27MB</p><hr>";
    program1[3] = "<p>This program lets you draw in-console using any character you wish. You can fit the canvas to screen as well as skew for interesting effects.</p></div>";

    dataConnector += program10.join("");
    dataConnector += program9.join("");
    dataConnector += program8.join("");
    dataConnector += program7.join("");
    dataConnector += program6.join("");
    dataConnector += program5.join("");
    dataConnector += program4.join("");
    dataConnector += program3.join("");
    dataConnector += program2.join("");
    dataConnector += program1.join("");
    document.getElementById("my_programs").innerHTML = dataConnector;

    // Link into another function that creates the css
    cssCreator();
}
