for i in *.mp4; do ffmpeg -i "$i" -f image2 -vf "scale='min(640, iw)':-2, fps=fps=0.25" "${i}"img%03d.jpg && magick convert "${i}"*.jpg +append "${i}"__sprite.jpg && find . ! -name '*__sprite.jpg' ! -name '*.mp4' -type f -exec rm -f {} +
; done
dings