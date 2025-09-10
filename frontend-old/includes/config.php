<?php
// includes/config.php

// Define constants for paths
define('BASE_URL', './'); // Root of the project
define('ASSETS_URL', BASE_URL . 'assets/');
define('CSS_URL', ASSETS_URL . 'css/');
define('JS_URL', ASSETS_URL . 'js/');
define('IMG_URL', BASE_URL . 'images/'); // Points to ./images/

// Project data (can be replaced with database queries)
$projects = [
    [
        'title' => 'Project 1',
        'details' => 'Project 1: A modern office complex with sustainable design. Completed: 2024. Location: Mumbai.',
        'image' => 'project-img.png'
    ],
    [
        'title' => 'Project 2',
        'details' => 'Project 2: Luxury resort with a focus on nature. Completed: 2023. Location: Goa.',
        'image' => 'project-img-two.png'
    ],
    [
        'title' => 'Project 3',
        'details' => 'Project 3: Cultural center with innovative architecture. Completed: 2022. Location: Delhi.',
        'image' => 'project-img-three.png'
    ],
    [
        'title' => 'Project 4',
        'details' => 'Project 4: Residential tower with green spaces. Completed: 2025. Location: Bangalore.',
        'image' => 'project-img-four.png'
    ],
    [
        'title' => 'Project 5',
        'details' => 'Project 5: Commercial plaza with unique facade. Completed: 2024. Location: Hyderabad.',
        'image' => 'project-img-five.png'
    ]
];