<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Projects | Rippotai</title>
    <?php include('linkheader.php'); ?>
    <style>
    .project-details {
        position: relative;
        overflow: hidden;
        border-radius: 10px;
        transition: transform 0.3s ease-in-out;
    }

    .project-details:hover {
        transform: scale(1.05);
    }

    .project-details img {
        width: 100%;
        height: auto;
        display: block;
        border-radius: 10px;
    }

    .project-overlay {
        position: absolute;
        bottom: -50%;
        left: 0;
        width: 100%;
        height: 50%;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        padding: 15px;
        transition: bottom 0.3s ease-in-out;
    }

    .project-details:hover .project-overlay {
        bottom: 0;
    }

    .see-all-btn {
        display: inline-block;
        background: #000;
        color: #fff;
        padding: 10px 20px;
        text-decoration: none;
        border-radius: 5px;
        transition: background 0.3s ease-in-out;
    }

    .see-all-btn:hover {
        background: #444;
    }
    </style>
</head>

<body>
    <div class="page-wrapper">
        <?php include('header.php'); ?>
        <section class="our-project-wrapper">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="heading text-center">
                            <h2>Our Projects</h2>
                        </div>
                    </div>
                </div>

                <div class="project-grid mt-3">
                    <div class="row">
                        <?php
                        $projects = [
                            ["title" => "Project One", "description" => "A brief description of Project One.", "image" => "images/project-img.png"],
                            ["title" => "Project Two", "description" => "A deep dive into technology.", "image" => "images/project-img-two.png"],
                            ["title" => "Project Three", "description" => "A game-changing initiative.", "image" => "images/project-img-three.png"],
                            ["title" => "Project Four", "description" => "A unique blend of art and design.", "image" => "images/project-img-four.png"],
                            ["title" => "Project Five", "description" => "An innovative architectural project.", "image" => "images/project-img-five.png"]
                        ];

                        foreach ($projects as $project) {
                        ?>
                        <div class="col-xl-4 col-lg-4 col-md-4 mt-5">
                            <div class="project-details">
                                <img src="<?php echo $project['image']; ?>" class="img-fluid"
                                    alt="<?php echo $project['title']; ?>">
                                <div class="project-overlay">
                                    <h5><?php echo $project['title']; ?></h5>
                                    <p><?php echo $project['description']; ?></p>
                                </div>
                            </div>
                        </div>
                        <?php } ?>
                    </div>
                </div>


            </div>
        </section>
        <?php include('footer.php'); ?>
    </div>
</body>

</html>