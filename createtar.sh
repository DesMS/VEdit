#!/bin/bash
rm -rf ./ffmpeg.tar.gz &>/dev/null
tar -czvf ffmpeg.tar.gz -C ./ffmpeg .
exit $?