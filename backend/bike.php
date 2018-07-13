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

if ($request->isMethod(Request::METHOD_GET)) {
    $id = $request->query->getInt('id');
    $bikes = new Bikes();
    $bike = $bikes->withId($id);
    $response = !$bike ? new JsonResponse('', 404) : new JsonResponse($bike);
} elseif ($request->isMethod(Request::METHOD_OPTIONS)) {
    $response = new Response();
    $response->headers->set('Allow', 'GET');
} else {
    $error = new VndError('Invalid Method', 42);
    $response = new Response($error->asJson(true), 402);
    $response->headers->set('Content-Type', 'application/vnd.error+json');
}
$response->prepare($request);
$response->send();
