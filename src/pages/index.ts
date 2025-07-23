import { Page } from "../page";

const page = new Page(
    'main-page',
    [
        {
            key: 'div',
            properties: {
                'data-key': '1234'
            }
        }
    ]
);

export default page;