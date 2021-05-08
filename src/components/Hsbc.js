import React from 'react'
import './hsbc.css'
const projects = [{ id: 0, name: '' }, { id: 1, name: '花生' }, { id: 2, name: '苹果' }, { id: 3, name: '杨桃' }];

// 效果：
// 1、点击单选，可以根据选项显示文本框或下拉框
// 2、刚开始进入页面，警告，输入框和下拉框都不会标红。但是跳转按钮不能点击
// 3、当输入框或下拉框不符合规范的时候，标红！且弹出警告
// 4、输入框或下拉框任一不符合规范，不能跳转
export const Hsbc = () => {
    // 显示下拉框的组件 还是 显示两个输入框的组件，默认显示下拉框的
    const [isSelect, setIsSelect] = React.useState('radio1');

    // 输入框1，2，3
    const [isOne, setIsOne] = React.useState('');
    const [isTwo, setIsTwo] = React.useState('');
    const [isTree, setIsTree] = React.useState('');

    // 下拉框的选中的值,默认为空
    const [selectValue, setselectValue] = React.useState('');
    // 输入框1，2，3不符合规范的时候标红
    const [radio1Error, setradio1Error] = React.useState(false);
    const [radio2Error, setradio2Error] = React.useState(false);
    const [radio3Error, setradio3Error] = React.useState(false);

    // 判断是否可以点击按钮，进行路由跳转
    const expensive = React.useMemo(() => {
        // 第一组：输入框1有值且不标红（符合规范）且下拉选中（符合规范）
        if (isOne && !radio1Error && selectValue) {
            return true;
        }
        // 第二组：输入框2有值且不标红（符合规范）且输入框3有值且不标红（符合规范）
        if (isTwo && !radio2Error && isTree && !radio3Error) {
            return true;
        }
        return false;
    }, [isOne, isTwo, isTree, selectValue])

    // 判断是否显示警告
    const showWraning = React.useMemo(() => {
        // 只要输入框中有一项不符合规范，就会弹出警告！未包括多选框
        if (radio1Error || radio2Error || radio3Error) {
            return true;
        }
        return false
    }, [radio1Error, radio2Error, radio3Error])
    // 切换的时候重置所有的值
    const reset = () => {
        setIsOne('')
        setIsTwo('')
        setIsTree('')
        setradio1Error('')
        setradio2Error('')
        setradio3Error('')
        setselectValue('')
    }
    return (
        <div>
            {/* 警告 */}
            {showWraning ? (<div>
                这是一条警告，说明输入项有不符合规范的
            </div>) : ''}
            {/* 单选框 */}
            <div>
                <label > <input type="radio" name='gender' value="radio1" checked={isSelect === 'radio1'}
                    onChange={(e) => { reset(); setIsSelect(e.target.value) }} />单选1</label>
                <label > <input type="radio" name='gender' value="radio2" checked={isSelect === 'radio2'}
                    onChange={(e) => { reset(); setIsSelect(e.target.value) }} />单选2</label>
            </div>
            {/* 输入框、 */}
            <div className='shuru'>
                {isSelect === 'radio1' ? (
                    <div>
                        <select placeholder="" value={selectValue} onChange={(e) => { setselectValue(e.target.value) }}>
                            {projects.length > 0 && projects.map((item, i) => {
                                if (i === 0) {
                                    return <option key={i} value={item.name} style={{ display: 'none' }}>{item.name}</option>
                                }
                                return <option key={i} value={item.name}>{item.name}</option>
                            })}
                        </select>
                        <input type="text" placeholder="第一个输入框" value={isOne} className={radio1Error ? 'error' : ''}
                            // 主要对用户完成输入离开文本框时作校验,仅供测试，可以不用
                            onBlur={(e) => {
                                // 主要校验字符串是否存在
                                if (e.target.value) {
                                    setradio1Error(false)
                                    return;
                                }
                                setradio1Error(true)
                            }}
                            onChange={(e) => {
                                setIsOne(e.target.value)
                                // 主要校验数字，未对字符串做限制
                                // 如果它不为空且 0< x <100 的时候，符合规范。否则标红
                                if (e.target.value && parseFloat(e.target.value) < 100 && parseFloat(e.target.value) > 0) {
                                    setradio1Error(false)
                                    return;
                                }
                                setradio1Error(true)
                            }} />
                    </div>
                ) : (
                        <div>
                            <input type="text" placeholder="第二个输入框" value={isTwo} className={radio2Error ? 'error' : ''}
                                // 主要对用户完成输入离开文本框时作校验,仅供测试，可以不用，防止用户点击输入框却什么都不输入就离开
                                onBlur={(e) => {
                                    // 主要校验字符串是否存在
                                    if (e.target.value) {
                                        setradio2Error(false)
                                        return;
                                    }
                                    setradio2Error(true)
                                }}
                                onChange={(e) => {
                                    setIsTwo(e.target.value)
                                    // 主要字符串是否存在
                                    if (e.target.value) {
                                        setradio2Error(false)
                                        return;
                                    }
                                    setradio2Error(true)
                                }}
                            />
                            <input type="text" placeholder="第三个输入框" value={isTree} className={radio3Error ? 'error' : ''}
                                // 主要对用户完成输入离开文本框时作校验,仅供测试，可以不用，防止用户点击输入框却什么都不输入就离开
                                onBlur={(e) => {
                                    // 主要校验字符串是否存在
                                    if (e.target.value) {
                                        setradio3Error(false)
                                        return;
                                    }
                                    setradio3Error(true)
                                }}
                                onChange={(e) => {
                                    setIsTree(e.target.value)
                                    // 主要校验字符串是否存在
                                    if (e.target.value) {
                                        setradio3Error(false)
                                        return;
                                    }
                                    setradio3Error(true)
                                }}
                            />
                        </div>
                    )}
            </div>

            {/* 点击跳转、 */}
            <div className='tiao'>
                <div
                    // 跳转按钮是否可以点击，默认false是不可以
                    className={expensive ? 'light' : 'dark'}
                    onClick={() => { console.log('跳转了！！！！！！') }}
                >点击</div>
            </div>
        </div>
    )
}