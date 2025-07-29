export class Queue {
    static promiseQueue: Promise<any>[] = [];
    private static finishedBuild: boolean = false;

    static markAsFinished() {
        this.finishedBuild = true;
    }

    static registerPromise(promise: Promise<any>) {
        if(this.finishedBuild)
            throw new Error('Can\'t register this promise because the queue is already finished');

        this.promiseQueue.push(promise);
    }

    static async resolveAllPromise() {
        this.markAsFinished();

        for(let index = 0; index < this.promiseQueue?.length; index++) {
            const promise = this.promiseQueue[index];
            try {
                await promise;
                console.log(`Promise resolved ${index + 1}/${this.promiseQueue?.length}`)
            } catch(e) {
                console.log(`Promise failed ${index + 1}/${this.promiseQueue?.length}`)
                
            }
        }
    }

}