CC_SRC_PATH="../chaincode/ecert/javascript/"
C_SRC_LANGUAGE="javascript"

pushd ../test-network

./network.sh deployCC -ccn ecert -ccv 2 -cci initLedger -ccl ${CC_SRC_LANGUAGE} -ccp ${CC_SRC_PATH}
popd

