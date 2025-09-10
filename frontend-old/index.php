<?php
// pages/index.php
require_once './includes/config.php';
$page_title = 'Home';
require_once './header.php';
?>

<!-- Hero Section with Slider -->
<section class="hero">
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img src="<?php echo IMG_URL; ?>main-banner.jpg" alt="Hero Image 1" class="hero-image" />
            </div>
            <div class="swiper-slide">
                <img src="<?php echo IMG_URL; ?>main-banner-2.jpg" alt="Hero Image 2" class="hero-image" />
            </div>
            <div class="swiper-slide">
                <img src="<?php echo IMG_URL; ?>main-banner-3.jpg" alt="Hero Image 3" class="hero-image" />
            </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
        <!-- Add Navigation -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</section>

<section class="who-we-are">
    <div class="who-we-are-container">
        <div class="who-we-are-text">
            <h3>Who are we</h3>
            <p>We design timeless spaces blending creativity and functionality.</p>
        </div>
        <div class="who-we-are-image">
            <img src="<?php echo IMG_URL; ?>who-we-are.jpg" alt="Who we are" />
        </div>
    </div>
</section>

<section class="projects-showcase">
    <h2>Projects Showcase</h2>
    <div class="bento-grid">
        <?php foreach ($projects as $index => $project): ?>
        <div class="bento-item">
            <img src="<?php echo IMG_URL . $project['image']; ?>" alt="<?php echo $project['title']; ?>" />
            <p><?php echo $project['title']; ?></p>
            <div class="details-container">
                <h3><?php echo $project['title']; ?></h3>
                <p class="project-details"><?php echo $project['details']; ?></p>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</section>

<?php require_once './footer.php'; ?>