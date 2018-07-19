<?php
/**
 * PHP Version 7.1
 */

use Ramsey\VndError\VndError;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require __DIR__ . '/vendor/autoload.php';

$request = Request::createFromGlobals();

if (!checkToken($request, KEY)) {
    $response = new Response('', 401);
} elseif ($request->isMethod(Request::METHOD_DELETE)) {
    $id = $request->query->getInt('id');
    $bikes = new Bikes();
    $bikes->delete($id);
    $response = new Response();
} elseif ($request->isMethod(Request::METHOD_OPTIONS)) {
    $response = new Response();
    $response->headers->set('Allow', 'DELETE');
} else {
    $error = new VndError('Invalid Method', 42);
    $response = new Response($error->asJson(true), 402);
    $response->headers->set('Content-Type', 'application/vnd.error+json');
}
$response->prepare($request);
$response->send();
