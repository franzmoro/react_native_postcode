#!/bin/bash
if [[ $TRAVIS ]]; then
  CONFIGURATION=Release
else
  CONFIGURATION=Debug
fi;
echo "***** Building $CONFIGURATION configuration *****"
xcodebuild \
  -project ios/inmotion_postcode.xcodeproj \
  -scheme inmotion_postcode GCC_PREPROCESSOR_DEFINITIONS='$GCC_PREPROCESSOR_DEFINITIONS TEST=1'\
  -configuration $CONFIGURATION \
  -destination "platform=iOS Simulator,OS=$IOS_VERSION,name=$DEVICE_NAME" \
  -derivedDataPath ios/build
