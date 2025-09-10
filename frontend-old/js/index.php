<?php
// index.php (root)
require_once 'includes/config.php';

// Simple routing
$request = isset($_GET['page']) ? $_GET['page'] : 'index';

switch ($request) {
    case 'about':
        require './about.php';
        break;
    case 'projects':
        require './projects.php';
        break;
    case 'contact':
        require './contact.php';
        break;
    case 'career':
        require './career.php';
        break;
    default:
        require './index.php';
        break;
}