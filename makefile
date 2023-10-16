gen_proto_type:
	protoc -I ./src/proto --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=./ --ts_proto_opt=nestJs=true ./src/proto/*.proto

create_image:
	docker build -t nest-cloud-run .

run_container:
	docker run -d -p 3001:3001 --name gateway --network cu-overflow-subject-service_subject nest-cloud-run
