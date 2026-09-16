# Modèles embarqués

## u2netp.onnx (4,5 Mo)
U²-Net-p — Qin et al., « U²-Net: Going Deeper with Nested U-Structure for Salient Object Detection », 2020.
Licence Apache 2.0. Export ONNX issu du projet rembg (danielgatis/rembg, release v0.0.0).
Entrée `input.1` [1,3,320,320] float32 normalisée ImageNet ; sortie `1959` [1,1,320,320].

Utilisé par quote-page.html sur mobile (moteur « léger ») à la place de RMBG-1.4, trop lourd
pour un téléphone en wasm mono-thread.
