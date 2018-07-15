<?php
/**
 * PHP Version 7.1
 */

use Ramsey\VndError\VndError;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require __DIR__ . '/vendor/autoload.php';

$request = Request::createFromGlobals();

if ($request->isMethod(Request::METHOD_POST)) {
    $bike = json_decode($request->getContent(), true);
    $bikes = new Bikes();
    $bike = $bikes->add($bike);
    $response = new JsonResponse($bike);
} elseif ($request->isMethod(Request::METHOD_OPTIONS)) {
    $response = new Response();
    $response->headers->set('Allow', 'POST');
} else {
    $error = new VndError('Invalid Method', 42);
    $response = new Response($error->asJson(true), 402);
    $response->headers->set('Content-Type', 'application/vnd.error+json');
}
$response->prepare($request);
$response->send();
