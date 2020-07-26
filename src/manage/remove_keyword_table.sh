#!/bin/bash

key=gmtModifier


find . -type f | while read line
do
	echo $line | grep -w 'tableColumn.js' && \
	number=`awk "/$key/ {print FNR}" $line` && \
	ends=`echo $number + 1 | bc` && \
	star=`echo $number - 4 | bc` && \
	sed -i "$star","$ends"d $line
done
