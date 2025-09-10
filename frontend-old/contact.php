<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us | Rippotai</title>
    <?php include('linkheader.php'); ?>
    <style>
    .contact-wrapper {
        padding: 50px 0;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .map-container {
        margin-top: 30px;
    }

    iframe {
        width: 100%;
        height: 400px;
        border: none;
    }
    </style>
</head>

<body>
    <div class="page-wrapper">
        <?php include('header.php'); ?>

        <section class="contact-wrapper">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="heading text-center">
                            <h2>Contact Us</h2>
                            <p>If you have any questions or need assistance, feel free to reach out to us. We’d love to
                                hear from you!</p>
                        </div>
                    </div>
                </div>

                <div class="contact-form mt-3">
                    <div class="row">
                        <div class="col-md-6">
                            <form action="contact-form-handler.php" method="post">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Name</label>
                                    <input type="text" id="name" name="name" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" id="email" name="email" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label for="message" class="form-label">Message</label>
                                    <textarea id="message" name="message" class="form-control" rows="4"
                                        required></textarea>
                                </div>
                                <button type="submit" class="btn btn-primary w-100">Send Message</button>
                            </form>
                        </div>

                        <div class="col-md-6">
                            <div class="map-container">
                                <h4>Our Location</h4>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.9220205218063!2d144.963057815316!3d-37.81621497975132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d47612ab14f%3A0x2f7b1b8a8f6a5e5c!2sFederation%20Square!5e0!3m2!1sen!2sin!4v1645689512580!5m2!1sen!2sin"
                                    allowfullscreen="" loading="lazy">
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <?php include('footer.php'); ?>
    </div>
</body>

</html>