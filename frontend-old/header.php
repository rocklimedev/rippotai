<?php
// includes/header.php
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Architectural Firm<?php echo isset($page_title) ? ' - ' . $page_title : ''; ?></title>
    <link rel="stylesheet" href="./style.css" />
    <!-- Swiper.js CSS -->
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
</head>

<body>
    <header>
        <div class="logo">
            <img src="./images/logo.png" alt="Logo" />
        </div>
        <nav>
            <ul>
                <li><a href="<?php echo BASE_URL; ?>about">About</a></li>
                <li><a href="<?php echo BASE_URL; ?>projects">Project</a></li>
                <li><a href="<?php echo BASE_URL; ?>contact">Contact</a></li>
                <li><a href="<?php echo BASE_URL; ?>career">Career</a></li>

            </ul>
            <form class="search-form" id="searchForm">
                <input type="text" id="searchInput" placeholder="Search projects..." />
                <button type="submit">Search</button>
            </form>
        </nav>
    </header>