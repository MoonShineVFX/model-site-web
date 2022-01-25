import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';

test('render component to test', () => {

    // 1. render 出要測試的元件
    render(<Navbar />);

    // 2. 找到元件中某元素位置
    // const button = screen.getByText(/buy it/i);

    // // 3. 對該元素進行操作和互動
    // fireEvent.click(button);

    // // 4. 檢視結果是否和預期相符
    // const banner = screen.getByText(/get promo/i);
    // expect(banner).toBeInTheDocument();

});
