<?php


?>

<!DOCTYPE html>
<html>
    <head>
        <style>
            .dropbtn {
                background-color: #4CAF50;
                color: white;
                padding: 16px;
                font-size: 16px;
                border: none;
                cursor: pointer;
            }

            .dropbtn:hover, .dropbtn:focus {
                background-color: #3e8e41;
            }

            .dropdown {
                position: relative;
                display: inline-block;
            }

            .dropdown-content {
                display: none;
                position: absolute;
                background-color: #f9f9f9;
                min-width: 160px;
                overflow: auto;
                box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
                z-index: 1;
            }

            .dropdown-content a {
                color: black;
                padding: 12px 16px;
                text-decoration: none;
                display: block;
            }

            .dropdown a:hover {background-color: #f1f1f1}

            .show {display:block;}
        </style>
    </head>

    <body>
        <h3>ข้อ Group by ข้อที่ 17</h3>
        <div id='tabdiv'>
            
            <table id='tableMax' border="1" cellpadding="2" cellspacing="2" align="center">
                <tr>
                    <th style='width:150px; border:1px solid black;'>Position</th>
                    <th style='width:150px; border:1px solid black;'>Max Salary</th>
                </tr>
                <?php
                    include 'queryDB.php';
                ?>
            </table>
        </div>
        <br>
        <div class="dropdown" align="center">
            <button onclick="myFunction()" class="dropbtn" >Export As</button>
            <div id="myDropdown" class="dropdown-content">
                <a href="#" onclick="exportPDF();">PDF</a>
                <a href="#" onclick="exportCSV();">CSV</a>
                <a href="#" onclick="exportTXT();">TXT</a>
                <a href="#" onclick="exportXLS();">Excel</a>
            </div>
        </div>

        <form id="dataForm" name="dataForm" action="tcpdf_export_htmltable.php" method="POST" hidden>
            <input id="data" name="data">
        </form>

    </body>

</html>
<script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha256-/SIrNqv8h6QGKDuNoLGA4iret+kyesCkHGzVUUV0shc=" crossorigin="anonymous"></script>
<script src="jquery.tabletoCSV.js"></script>
<script type="text/javascript" src="tableExport.js"></script>
<script type="text/javascript" src="jquery.base64.js"></script>


<script>

    function exportTXT(){
        $('#tableMax').tableExport({type:'txt',escape:'false'});
    }

    function exportXLS(){
        $('#tableMax').tableExport({type:'excel',escape:'false'});
    }

    function exportCSV(){
        $("#tableMax").tableToCSV();
    }

    function exportPDF(){
        alert($('#tabdiv').html());
        $('#data').val($('#tabdiv').html());
        $('#dataForm').submit();
    }
    
    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
        }
    }
    }
</script>