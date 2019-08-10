INPUT_DIR="$1"
OUTPUT_DIR="$2"

echo $INPUT_DIR

echo $OUTPUT_DIR

mkdir "$OUTPUT_DIR"

for range_dir in "$INPUT_DIR"*;
do
    # echo $range_dir
    OIFS=$IFS
    IFS="/"
    read -r -a path_array <<< "$range_dir"
    filename=${path_array[4]}
    date_range=${filename:0:(${#filename} - 6)}
    IFS=$OIFS
    IFS=$(echo -en "\n\b")
    mkdir "$OUTPUT_DIR/$date_range"
    for oldmp4 in `ls "$range_dir"`
    do
        echo processing $range_dir/"$oldmp4"...
        echo writing to "$OUTPUT_DIR/$date_range/$oldmp4"...
        HandBrakeCLI -i $range_dir/"$oldmp4" -o "$OUTPUT_DIR/$date_range/$oldmp4"
        echo "done with" $range_dir/"$oldmp4"
        echo
    done
    IFS=$OIFS
done